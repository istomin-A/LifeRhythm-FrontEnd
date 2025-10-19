import { useEffect, useState } from 'react'
import { GoalsAPI, UsersAPI } from "@/store";

import Tabs from '@/widgets/Tabs'
import FormMain from '@/shared/ui/FormMain'
import Loading from '@/shared/ui/Loading'

import TabContent from './compotents/TabContent'

import { fotmatedAt } from './utils'
import type { User } from '@/store/users/types'
import type { TokenProps } from './home.type'
import type { Goal } from '@/store/goals/types'
import style from './home.module.scss'

function Home({ infoToken }: TokenProps) {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [titleGoal, setTitleGoal] = useState<string>("")
  const [descriptoinGoal, setDescriptoinGoal] = useState<string>("")
  const [error, setError] = useState<{ field: string; message: string }>({
    field: "",
    message: "",
  });
  const [goals, setGoals] = useState<Goal | null>(null);
  const [deleteGoal, setDeleteGoal] = useState<Goal | null>(null);
  const [updateGoalStat, setUpdateGoalStat] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorGetGoals, setErrorGetGoals] = useState<string | null>(null);
  const [errorUpdateGoals, setErrorUpdateGoals] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<{ createdAt: string; endDateTask: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // for 1 and 3 tab
  useEffect(() => {
    if (!infoToken?.user?.user_id) return;

    const getGoals = async () => {
      try {
        const data = await GoalsAPI.getGoals(String(infoToken.user?.user_id));
        setGoals(data);
      } catch (err: any) {
        console.error("Failed to load data:", err);
        setErrorGetGoals("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    getGoals();
  }, [infoToken?.user?.user_id, activeTab, deleteGoal, updateGoalStat]);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = infoToken.user?.user_id;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await UsersAPI.getUser(userId);
        setUser(data);
      } catch (err: any) {
        console.error("Failed to load data:", err);
        setError({ field: "getUser", message: "Failed to load user" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [infoToken.user?.user_id]);

  if (loading) return <Loading />;
  // if (errorGetGoals) return <Error>{errorGetGoals}</Error>;

  const userGoals = goals?.goals
  const activeGoals = userGoals
    ?.filter(goal => goal?.status === "active")
    ?.map(goal => ({
      ...goal,
      fotmatedAt: fotmatedAt(String(goal.createdAt))
    }));

  const doneGoals = userGoals
    ?.filter((goal) => goal?.status === "done")
    ?.map(goal => ({
      ...goal,
      fotmatedAt: fotmatedAt(String(goal.createdAt))
    }));

  const removeGoal = (e: React.MouseEvent<HTMLButtonElement>, userId: string, createAt: string) => {
    e.stopPropagation()
    const deleteGoal = async () => {
      try {
        const data = await GoalsAPI.deleteGoal(userId, createAt);
        setDeleteGoal(data)
      } catch (err: any) {
        console.error("Failed to delete data:", err);
      }
    };

    deleteGoal();
  }

  const updateGoalUI = (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: string,
    createAt: string,
    status: string,
    dateDone: string
  ) => {
    e.stopPropagation()
    const updateGoal = async () => {
      try {
        const data = await GoalsAPI.updateGoalStatus(userId, createAt, status, dateDone);
        setUpdateGoalStat(data)
      } catch (err: any) {
        console.error("Failed to delete data:", err);
        setErrorUpdateGoals("Failed to delete data:")
      }
    };

    updateGoal();
  }

  const setEndDateTask = (
    userId: string,
    createAt: string,
    endDate: string) => {
    const updateGoal = async () => {
      try {
        await GoalsAPI.setEndDateTask(userId, createAt, endDate);
      } catch (err: any) {
        console.error("Failed to delete data:", err);
        setErrorUpdateGoals("Failed to delete data:")
      }
    };

    updateGoal();
  }

  if (endDate && endDate.endDateTask) {
    setEndDateTask(
      String(infoToken.user?.user_id),
      endDate?.createdAt,
      String(endDate?.endDateTask)
    )
  }

  // for 2 tab
  const newGoals = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!titleGoal || !descriptoinGoal) {
      setError({
        field: !titleGoal ? "titleGoal" : "descriptoinGoal",
        message: "Fill in the field",
      })
      return
    }

    try {
      await GoalsAPI.newGoal({
        user_id: String(infoToken.user?.user_id),
        goals: [
          {
            titleGoal,
            descriptoinGoal,
            status: 'active',
            endDateTask: '',
            dateDone: ''
          }
        ]
      })

      setError({
        field: 'ok',
        message: 'Goal created',
      })

      setTitleGoal("")
      setDescriptoinGoal("")
    } catch (err) {
      console.error("Error creating goal:", err)
    }
  }

  const sendEmail = async (
    userId: string,
    createDateGoal: string,
    email: string,
    titleEmail: string,
    bodyEmail: string
  ) => {
    try {
      await GoalsAPI.sendEmail(
        userId,
        createDateGoal,
        email,
        titleEmail,
        bodyEmail
      );
    } catch (err) {
      console.error("Error sending email:", err)
    }
  }


  // content tabs
  const tabOne = (
    <TabContent
      infoToken={infoToken}
      errorGetGoals={errorGetGoals}
      goals={activeGoals}
      updateGoalUI={updateGoalUI}
      removeGoal={removeGoal}
      onSelectDate={(createdAt, endDateTask) => setEndDate({ createdAt, endDateTask })}
      sendEmail={sendEmail}
      user={user}
    />
  );

  const tabTwo = (
    <FormMain
      labelUserName={'Enter your target name'}
      labelPassword={'Enter your descriptoin target'}
      textArea
      Goals={newGoals}
      error={error}
      setTitleGoal={setTitleGoal}
      titleGoal={titleGoal}
      setDescriptoinGoal={setDescriptoinGoal}
      descriptoinGoal={descriptoinGoal}
    />
  )

  const tabThree = (
    <TabContent
      infoToken={infoToken}
      errorUpdateGoals={errorUpdateGoals}
      goals={doneGoals}
      removeGoal={removeGoal}
    />
  );

  return (
    <div className='_container'>
      <div className={style.wrapper}>
        <h1 className={style.title}>Goal management</h1>
        <Tabs
          error={error}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabOne={tabOne}
          tabTwo={tabTwo}
          tabThree={tabThree} />
      </div>
    </div>
  )
}

export default Home
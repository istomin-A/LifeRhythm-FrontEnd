import { useEffect, useState } from 'react'
import { GoalsAPI } from "@/store";

import Tabs from '@/widgets/Tabs'
import FormMain from '@/shared/ui/FormMain'
import Loading from '@/shared/ui/Loading'

import TabContent from './compotents/TabContent'

import type { HomeProps } from './home.type'
import type { Goal } from '@/store/goals/types'
import style from './home.module.scss'

function Home({ infoToken }: HomeProps) {
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

  if (loading) return <Loading />;
  // if (errorGetGoals) return <Error>{errorGetGoals}</Error>;

  const userGoals = goals?.goals
  const activeGoals = userGoals
    ?.filter(goal => goal?.status === "active")
    ?.map(goal => ({
      ...goal,
      fotmatedAt: new Date(String(goal.createdAt)).toLocaleString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }));

  const doneGoals = userGoals
    ?.filter((goal) => goal?.status === "done")
    ?.map(goal => ({
      ...goal,
      fotmatedAt: new Date(String(goal.createdAt)).toLocaleString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }));

  const removeGoal = (userId: string, createAt: string) => {
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

  const updateGoalStatus = (userId: string, createAt: string, status: string) => {
    const updateGoal = async () => {
      try {
        const data = await GoalsAPI.updateGoalStatus(userId, createAt, status);
        setUpdateGoalStat(data)
      } catch (err: any) {
        console.error("Failed to delete data:", err);
        setErrorUpdateGoals("Failed to delete data:")
      }
    };

    updateGoal();
  }

  // for 2 tab
  const newGoals = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!titleGoal || !descriptoinGoal) {
      setError({
        field: !titleGoal ? "titleGoal" : "descriptoinGoal",
        message: "Заполните поле",
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
            status: 'active'
          }
        ]
      })

      setError({
        field: 'ok',
        message: 'Цель создана',
      })

      setTitleGoal("")
      setDescriptoinGoal("")
    } catch (err) {
      console.error("Ошибка при создании цели:", err)
    }
  }

  // content tabs
  const tabOne = (
    <TabContent
      infoToken={infoToken}
      errorGetGoals={errorGetGoals}
      goals={activeGoals}
      updateGoalStatus={updateGoalStatus}
      removeGoal={removeGoal}
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
        <h1 className={style.title}>Управление целями</h1>
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
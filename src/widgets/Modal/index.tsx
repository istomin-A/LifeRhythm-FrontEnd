import ReactDOM from 'react-dom';

import ButtonActions from '@/shared/ui/ButtonActions'
import CloseIcon from '@/shared/images/close.svg?react'
import type { ModalProps } from './modal.type'
import style from './modal.module.scss'
import { useEffect, useRef } from 'react';

function Modal({ isOpen, setIsOpenModal, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!modalRef.current) return

    if (isOpen && !modalRef.current.open) {
      modalRef.current.showModal()
      document.body.className = '_lock'
    } else if (!isOpen && modalRef.current.open) {
      modalRef.current.close();
      document.body.className = '';
    }

    // обработчик клика по фону
    const handleClick = (e: MouseEvent) => {
      if (!modalRef.current) return;

      const rect = modalRef.current.getBoundingClientRect();
      const clickedInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!clickedInside) {
        modalRef.current.close();
        document.body.className = '';
        setIsOpenModal(false)
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.body.className = '';
    };
  }, [isOpen])

  const closeModal = () => setIsOpenModal(false)

  return ReactDOM.createPortal(
    <dialog ref={modalRef} className={style.modal}>
      <div className={style.modalContent}>
        <ButtonActions
          className={style.modalClose}
          type="button"
          onClick={closeModal}
        >
          <CloseIcon className={style.icon} />
        </ButtonActions>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  )
}

export default Modal
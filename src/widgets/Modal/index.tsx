import ReactDOM from 'react-dom';

import type { ModalProps } from './modal.type'
import ButtonActions from '@/shared/ui/ButtonActions'
import CloseIcon from '@/shared/images/close.svg?react'
import style from './modal.module.scss'

function Modal({ isOpen, children }: ModalProps) {
  return ReactDOM.createPortal(
    <dialog open={isOpen} className={style.modal}>
      <div className={style.modalContent}>
        <ButtonActions className={style.modalClose} type="button">
          <CloseIcon />
        </ButtonActions>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  )
}

export default Modal
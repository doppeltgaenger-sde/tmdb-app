import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/Modal.scss";

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const node = modalRef.current;
    if (!node) return;

    const handleTransitionEnd = (e) => {
      if (e.target !== node) return;
      if (e.propertyName !== "opacity") return;

      if (!isVisible) {
        setIsMounted(false);
      }
    };

    node.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      node.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isMounted) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMounted, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div
      ref={modalRef}
      className={classNames(["modal", isVisible && "modal--visible"])}
    >
      <div className="modal__overlay" onClick={onClose} />

      <div className="modal__body">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon className="modal__close-icon" name="close" />
        </button>

        {isVisible && children}
      </div>
    </div>,
    document.body,
  );
};

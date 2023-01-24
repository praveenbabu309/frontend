import '../App.css';

const Modal = ({ handleClose, show, handleok }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        
        <div className='deletemsg'>
          <h1>Do you want to delete?</h1>
          </div>
        <button type="button" className='modelcancelbutton' onClick={handleClose}>
          Cancel
        </button>
        <button type="button" className='modelokbutton' onClick={handleok}>
          OK
        </button>
      </section>
    </div>
  );
};

export default Modal;
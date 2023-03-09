import '../App.css';

const Modal = ({ handleClose, show, handleok,msg,oklabel ,cancellabel}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        
        <div className='deletemsg'>
          <h1 className='dialogheader'> confirmation</h1>
          <h1> {msg} </h1>
          </div>
          
        <button type="button" className='modelcancelbutton' onClick={handleClose}>
          {cancellabel}
        </button>
        {msg=="Data is already presented"?'':
        <button type="button" className='modelokbutton' onClick={handleok}>
          {oklabel}
        </button>}
      </section>
    </div>
  );
};

export default Modal;
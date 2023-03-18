import '../App.css';

const Modal = ({ handleClose, show, handleok,msg,oklabel ,hideleftbutton,cancellabel,dialogueHeader}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        
        <div className='deletemsg'>
          <h1 className='dialogheader'> {dialogueHeader}</h1>
          <h1 className='textcenter'> {msg} </h1>
          </div>
          
        <button type="button" className='modelcancelbutton' onClick={handleClose}>
          {cancellabel}
        </button>
      <div hidden={hideleftbutton}>
        <button type="button" className='modelokbutton'  onClick={handleok}>
          {oklabel}
        </button></div>
      </section>
    </div>
  );
};

export default Modal;
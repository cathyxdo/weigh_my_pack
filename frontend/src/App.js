import {useState, useEffect, useRef} from 'react';
import Menu from "./components/Menu";
import ListDetails from './components/ListDetails.js';
import ModalNewList from './components/ModalNewList.js';
import ModalDeleteCategory from './components/ModalDeleteCategory.js';
import axiosInstance from './axios.js';

function App() {
  let localList = localStorage.getItem("localList") ? JSON.parse(localStorage.getItem("localList")) : [];

  const [id, setId] = useState(0);    // show first list by default
  const [apiList, setApiList] = useState(localList); // Default to local list
  const [currentListName, setCurrentListName] = useState('');
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState({show: false, categoryId: ''});
  const [showSideBar, setShowSideBar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleClick(index) {
    setId(index);
    setCurrentListName(apiList[index].name);
  }

  useEffect(() => {
    axiosInstance.get('lists/')
    .then(result => {
      setApiList(result.data);
      if (result.data.length > 0) {
        setCurrentListName(result.data[0].name);
      }
      setIsLoggedIn(true);
    }).catch(err => {
      console.log(err);
      console.log("store local list");
      console.log(localList);
      localStorage.setItem("localList", JSON.stringify(localList));
      setApiList(localList);
      if (localList.length > 0) {
        setCurrentListName(localList[0].name);
      } else {
        setCurrentListName(''); // Fallback to empty string
      }    });
  }, []);

  const handleModalClickAway = (event, modalRef, closeModal) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const modalNewListRef = useRef(null);
  const modalDeleteCategoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddListModal) {
        handleModalClickAway(event, modalNewListRef, () => setShowAddListModal(false));
      }
      if (deleteCategoryModal.show) {
        handleModalClickAway(event, modalDeleteCategoryRef, () =>
          setDeleteCategoryModal({ show: false, categoryId: '' })
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddListModal, deleteCategoryModal]);
  
  return (
    <div className="content">
        <div className={"sidebar " + (showSideBar ? 'showBar' : 'hideBar' ) }>
          <span className="sideBarHeader">
            <a href="/" className="home">
              <h2>Weigh My Pack 🎒</h2>
            </a>
            <button onClick={() => setShowSideBar(false)} className="collapseIcon">        
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="rotate(180 12 12)"><path fill="currentColor" d="M13.925 19q-.625 0-.888-.537t.088-1.038L17 12l-3.875-5.425q-.35-.5-.088-1.038T13.925 5q.275 0 .5.138t.375.337l4.225 5.95q.1.125.15.275t.05.3q0 .15-.05.288t-.15.287l-4.225 5.95q-.15.2-.375.338t-.5.137Zm-5.95 0q-.625 0-.887-.537t.087-1.038L11.05 12L7.175 6.575q-.35-.5-.087-1.038T7.975 5q.275 0 .5.138t.375.337l4.225 5.95q.1.125.15.275t.05.3q0 .15-.05.3t-.15.275l-4.225 5.95q-.15.2-.375.338t-.5.137Z"></path></g></svg>
            </button>
          </span>

          <Menu apiList={apiList} setApiList={setApiList} onSelectList={handleClick} selectedIndex={id} isLoggedIn={isLoggedIn}/>

          <button className="add-item" onClick={()=> setShowAddListModal(true)}>
            <div className="add-icon-wrapper">
              <svg className="plus-outline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
              <svg className="plus-filled" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
            </div>
              Add List
            </button>
        </div>
        <div className={"collapsedSideBar "+ (showSideBar ? 'showBar' : 'hideBar' )}>

              <button className="showListsButton" onClick={() => setShowSideBar(true)}>
                <svg className="hamburgerIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"></path></svg>  
                <svg className="arrowIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.925 19q-.625 0-.888-.537t.088-1.038L17 12l-3.875-5.425q-.35-.5-.088-1.038T13.925 5q.275 0 .5.138t.375.337l4.225 5.95q.1.125.15.275t.05.3q0 .15-.05.288t-.15.287l-4.225 5.95q-.15.2-.375.338t-.5.137Zm-5.95 0q-.625 0-.887-.537t.087-1.038L11.05 12L7.175 6.575q-.35-.5-.087-1.038T7.975 5q.275 0 .5.138t.375.337l4.225 5.95q.1.125.15.275t.05.3q0 .15-.05.3t-.15.275l-4.225 5.95q-.15.2-.375.338t-.5.137Z"></path></svg>
              </button>
        </div>
        <div className={"mobileMenu " + (showSideBar ? 'showBar' : 'hideBar' ) }>
          <button className="showListsButton" onClick={() => setShowSideBar(true)} >
            <svg className="hamburgerIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"></path></svg>  
            <svg className="arrowIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.925 19q-.625 0-.888-.537t.088-1.038L17 12l-3.875-5.425q-.35-.5-.088-1.038T13.925 5q.275 0 .5.138t.375.337l4.225 5.95q.1.125.15.275t.05.3q0 .15-.05.288t-.15.287l-4.225 5.95q-.15.2-.375.338t-.5.137Zm-5.95 0q-.625 0-.887-.537t.087-1.038L11.05 12L7.175 6.575q-.35-.5-.087-1.038T7.975 5q.275 0 .5.138t.375.337l4.225 5.95q.1.125.15.275t.05.3q0 .15-.05.3t-.15.275l-4.225 5.95q-.15.2-.375.338t-.5.137Z"></path></svg>
                  
          </button>
        </div>

        {apiList && (
          <ListDetails showSideBar={showSideBar} apiList={apiList} selectedIndex={id} listName={currentListName} handleNameChange={setCurrentListName} setApiList={setApiList} setDeleteCategoryModal={setDeleteCategoryModal} isLoggedIn={isLoggedIn}/>
        )}  

        {showAddListModal && 
          <div className="modal-background">
            <div className="modal-wrapper" ref={modalNewListRef}>
              <ModalNewList showModal={setShowAddListModal} apiList={apiList} setApiList={setApiList} isLoggedIn={isLoggedIn}/> 

            </div>
          </div>
        }
        {deleteCategoryModal.show && 
          <div className="modal-background">
            <div ref={modalDeleteCategoryRef}>

              <ModalDeleteCategory selectedIndex={id} categoryId={deleteCategoryModal.categoryId} setDeleteCategoryModal={setDeleteCategoryModal} apiList={apiList} setApiList={setApiList} isLoggedIn={isLoggedIn}/>
          </div>
          </div>
        }
        
    </div>
  );
}

export default App;

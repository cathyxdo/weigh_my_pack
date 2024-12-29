import axios from "axios";
export default function ModalDeleteCategory({categoryId, selectedIndex, setDeleteCategoryModal, apiList, setApiList, isLoggedIn}) {

    function handleDeleteCategory(event) {
        event.preventDefault();
        
        if (isLoggedIn) {
            axios.delete(process.env.REACT_APP_API_BASE_URL + 'categories/' + categoryId + '/')
            .then(result => {
                /*
                setApiList(apiList.map((list, index) => {
                    if(index === selectedIndex) {
                        list.categories = list.categories.filter((c) => c.id !== categoryId);
                        return list;
                    } else {
                        return list;
                    }
                }))
                */
                updateStateDeleteCategory();
                setDeleteCategoryModal({
                    'show': false,
                    'categoryId': ''
                });
            }).catch(err => {
                console.log(err);
            });
        } else {
            updateStateDeleteCategory();
            setDeleteCategoryModal({
                'show': false,
                'categoryId': ''
            });
            localStorage.setItem("localList", JSON.stringify(apiList));
        }
        function updateStateDeleteCategory() {
            setApiList(apiList.map((list, index) => {
                if(index === selectedIndex) {
                    list.categories = list.categories.filter((c) => c.id !== categoryId);
                    return list;
                } else {
                    return list;
                }
            }))
        }
    }
    return (
        <div class="modal category-delete">
            <div class="modal-header">
                <h3>Are you sure you want to delete this category?</h3>
            </div>
            <div class="modal-content">
                <p>This action can not be undone.</p>
            </div>
            <div class="modal-footer">
                <button class="secondary-button" onClick={() => setDeleteCategoryModal(false)}>Cancel</button>
                <button class="primary-button" onClick={handleDeleteCategory}>Yes, delete category</button>
            </div>
        </div> 
    )
}


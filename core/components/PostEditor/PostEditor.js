import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PostComponentSelectorModal from './PostComponentsSelectorModal'
import EditPostComponentModal from './EditPostComponentModal'
import AddPostComponentModal from './AddPostComponentModal'
import PostPreviewModal from './PostPreviewModal.js'
import PostContentEditor from './PostContentEditor'

import {
  hidePostComponentsSelectorModal,
  showPostComponentsSelectorModal
} from '../../reducers/post-components-selector-modal'

import {
  hideAddPostComponentModal,
  showAddPostComponentModal
} from '../../reducers/add-post-component-modal'

import {
  addNewPostComponent, // Add a new component
  removePostComponent, // Remove existing component
  editPostComponent, // Edit an existing component
  resetPost // Remove every thing and start from scratch
} from '../../reducers/editing-post-receipe'

import {
  showEditPostComponentModal,
  hideEditPostComponentModal
} from '../../reducers/edit-post-component-modal'

import { showPostPreviewModal, hidePostPreviewModal } from '../../reducers/post-preview-modal'
import { showLoadingModal, hideLoadingModal } from '../../reducers/mutation-status'

/**
 * @name PostEditor
 * @desc A set of tools for building and editing a post
 * @prop { isComponentsSelectorModalShowing } [REDUX] : is this modal showing
 * @prop { showComponentsSelectorModal } [REDUX] : f() to select the post component to add to the receipe
 * @prop { hideComponentsSelectorModal } [REDUX] : dipatch an action to hide this modal
 * @prop { showEditPostComponentModal } [REDUX] : f() to show EditPostComponentModal
 * @prop { hideEditPostComponentModal } [REDUX] : f() to hide EditPostComponentModal
 * @prop { showAddPostComponentModal } [REDUX] : Display a modal to enter an essential information to create a modal
 * @prop { hideAddPostComponentModal } [REDUX] : f() to hide 'AddPostComponentModal'. Used this when finished adding data to selected component
 * @prop { editPostComponentModal } [REDUX] : object contains information of a EditPostComponentModal
 * @prop { addPostComponentModal } [REDUX] : Object contains information about 'AddPostComponentModal'
 * @prop { hidePostPreviewModal } [REDUX] : f() to hide post preview modal
 * @prop { addNewPostComponent } [REDUX] : Add a new component to 'receipe'
 * @prop { editPostComponent } [REDUX] : f() to edit an existing post component in the receipe
 * @prop { showLoadingModal } [REDUX] : Show a loading screen modal while submiting post data to server
 * @prop { hideLoadingModal } [REDUX] : Hide the loading screen modal when post data is submited
 * @prop { classroomID } [REDUX] : Classroom ID
 * @prop { resetPost } [REDUX] : f() to delete all components in the post editor
 * @prop { isShowing } [REDUX] : A redux state used to specify wether to show or hide post preview modal
 * @prop { receipe } [REDUX] : A list of components that need to be rendered
 */
class PostEditor extends React.Component {
  render() {
    const {
      isComponentsSelectorModalShowing,
      showComponentsSelectorModal,
      hideComponentsSelectorModal,
      hideEditPostComponentModal,
      showEditPostComponentModal,
      showAddPostComponentModal,
      hideAddPostComponentModal,
      isPostPreviewModalShowing,
      editPostComponentModal,
      addPostComponentModal,
      showPostPreviewModal,
      hidePostPreviewModal,
      addNewPostComponent,
      removePostComponent,
      editPostComponent,
      showLoadingModal,
      hideLoadingModal,
      classroomID,
      resetPost,
      receipe
    } = this.props
    return (
      <div>
        <EditPostComponentModal
          hideEditPostComponentModal={hideEditPostComponentModal}
          editPostComponentModal={editPostComponentModal}
          editPostComponent={editPostComponent}
          receipe={receipe}
        />
        <AddPostComponentModal
          hideAddPostComponentModal={hideAddPostComponentModal}
          addPostComponentModal={addPostComponentModal}
          addNewPostComponent={addNewPostComponent}
          receipe={receipe}
        />
        <PostComponentSelectorModal
          isComponentsSelectorModalShowing={isComponentsSelectorModalShowing}
          hideComponentsSelectorModal={hideComponentsSelectorModal}
          showAddPostComponentModal={showAddPostComponentModal}
        />
        <PostPreviewModal
          hidePostPreviewModal={hidePostPreviewModal}
          isShowing={isPostPreviewModalShowing}
          receipe={receipe}
        />
        <PostContentEditor
          showComponentsSelectorModal={showComponentsSelectorModal}
          showEditPostComponentModal={showEditPostComponentModal}
          showPostPreviewModal={showPostPreviewModal}
          removePostComponent={removePostComponent}
          showLoadingModal={showLoadingModal}
          hideLoadingModal={hideLoadingModal}
          classroomID={classroomID}
          resetPost={resetPost}
          receipe={receipe}
        />
      </div>
    )
  }
}

PostEditor.propTypes = {
  // PostComponentsSelectorModal
  isComponentsSelectorModalShowing: PropTypes.bool.isRequired,
  showComponentsSelectorModal: PropTypes.func.isRequired,
  hideComponentsSelectorModal: PropTypes.func.isRequired,

  // AddPostComponentModal
  showAddPostComponentModal: PropTypes.func.isRequired,
  hideAddPostComponentModal: PropTypes.func.isRequired,
  addPostComponentModal: PropTypes.object.isRequired,

  // PostPreviewModal
  showPostPreviewModal: PropTypes.func.isRequired,
  hidePostPreviewModal: PropTypes.func.isRequired,

  // PostContentEditor Operations
  addNewPostComponent: PropTypes.func.isRequired,
  removePostComponent: PropTypes.func.isRequired,
  editPostComponent: PropTypes.func.isRequired,
  resetPost: PropTypes.func.isRequired,
  receipe: PropTypes.array.isRequired,

  // EditPostComponentModal
  editPostComponentModal: PropTypes.object.isRequired,
  showEditPostComponentModal: PropTypes.func.isRequired,
  hideEditPostComponentModal: PropTypes.func.isRequired,

  // Classroom ID
  classroomID: PropTypes.string.isRequired,

  // Display Loading Screen when submiting post data to server
  showLoadingModal: PropTypes.func.isRequired,
  hideLoadingModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isComponentsSelectorModalShowing: state.postComponentsSelectorModal,
  editPostComponentModal: state.editPostComponentModal,
  addPostComponentModal: state.addPostComponentModal,
  isPostPreviewModalShowing: state.postPreviewModal,
  receipe: state.editingPostReceipe
})

const mapDispatchToProps = dispatch => ({
  // PostComponentsSelectorModal
  showComponentsSelectorModal: () => dispatch(showPostComponentsSelectorModal()),
  hideComponentsSelectorModal: () => dispatch(hidePostComponentsSelectorModal()),

  // AddPostComponentModal
  hideAddPostComponentModal: () => dispatch(hideAddPostComponentModal()),
  showAddPostComponentModal: type => dispatch(showAddPostComponentModal(type)),

  // Display Loading Screen when submiting post data to server
  showLoadingModal: () => dispatch(showLoadingModal()),
  hideLoadingModal: () => dispatch(hideLoadingModal()),

  // PostContentEditor Operations
  resetPost: () => dispatch(resetPost()),
  removePostComponent: componentOrder => dispatch(removePostComponent(componentOrder)),
  addNewPostComponent: componentToAdd => dispatch(addNewPostComponent(componentToAdd)),
  editPostComponent: (order, type, newData) => dispatch(editPostComponent(order, type, newData)),

  // PostPreviewModal
  showPostPreviewModal: () => dispatch(showPostPreviewModal()),
  hidePostPreviewModal: () => dispatch(hidePostPreviewModal()),

  // EditPostComponentModal
  showEditPostComponentModal: (type, order) => dispatch(showEditPostComponentModal(type, order)),
  hideEditPostComponentModal: () => dispatch(hideEditPostComponentModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor)

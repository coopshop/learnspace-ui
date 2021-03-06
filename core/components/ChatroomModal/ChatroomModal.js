import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'

import { showChatroomModal, hideChatroomModal } from '../../reducers/chatroom-modal'

import { CLASSROOM_CHATROOM_PAGE } from '../../constants/endpoints/ui'

import { NotificationItem } from '../NotificationPanel'
import { ModalBackground, ModalPanel } from '../Modal'
import { Header, Body, Footer } from '../Card'
import { Button } from '../Button'

// hide this modal if the current url is /chatroom?c=???
const ChatroomModal = ({ isModalShowing, showModal, hideModal }) => (
  <ModalBackground show={isModalShowing}>
    <ModalPanel large>
      <Header>ข้อความที่ส่งถึงคุณ</Header>
      <Body overflowY="scroll" height="600px">
        {/* {}  */}
        {[0, 1, 2, 3, 4, 5, 6].map((_, i) => (
          <Link href={CLASSROOM_CHATROOM_PAGE} prefetch key={i}>
            <a>
              <NotificationItem
                origin="Introduction to Computer Science"
                content="ไสดมวไำดยสเนาฟบไำานดำฟสาดร่เพเาๆขนายำสกยบากนฟกานฟหากจๆไำาดชๆสยไำนด่ำไจาเ"
              />
            </a>
          </Link>
        ))}
      </Body>
      <Footer>
        <Button light onClick={() => hideModal()}>
          ปิด
        </Button>
      </Footer>
    </ModalPanel>
  </ModalBackground>
)

ChatroomModal.propTypes = {
  isModalShowing: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isModalShowing: state.chatroomModal
})

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showChatroomModal()),
  hideModal: () => dispatch(hideChatroomModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomModal)

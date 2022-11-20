import { useEffect } from 'react'
import { CometChat } from "@cometchat-pro/chat";
import { useParams } from 'react-router-dom';
import { CometChatUI } from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src'
import { Navbar } from '../../components/components';



function Chat() {

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Navbar />
            <CometChatUI />
        </div>
    )
}

export default Chat
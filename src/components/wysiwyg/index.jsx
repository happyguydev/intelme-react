import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { postCommentFile, postCommentProject, postCommentTask } from '../../services/tasks';
import Avatar from '../avatar';

import AtSignIcon from '../../assets/images/at-sign.svg';
import BoldText from '../../assets/images/bold-text.svg';
import Emoji from '../../assets/images/emoji.svg';
import ItalicText from '../../assets/images/italic-text.svg';
import Link from '../../assets/images/link.svg';
import PaperClip from '../../assets/images/paper-clip.svg';
import Underline from '../../assets/images/underline-text.svg';

import { ReactComponent as CommentSend } from '../icons/comment-send.svg';

import { WysiwygComponent } from './styles';
import { getProjectMembers } from '../../services/projects';

import { searchAllUsers } from '../../services/users';

import { newMessage } from '../../store/actions/messages';
import { toast } from 'react-toastify';

const Wysiwyg = ({
  projectId,
  activityType,
  activityId,
  onPost,
  docName,
  sendMessage,
  onMessageSend,
  recipientId,
  dispatchNewMessage,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { profile } = useSelector((state) => state.auth);
  const [members, setMembers] = useState([]);

  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!sendMessage) {
      const query = '';
      await getProjectMembers({ projectId, query }).then((res) => {
        const memberList = [];
        // eslint-disable-next-line array-callback-return
        res.users.map((item) => {
          memberList.push({
            text: item.username,
            value: item.username,
            url: 'mailto:' + item.email,
          });
        });

        setMembers(memberList);
      });
    } else {
      await searchAllUsers().then((res) => {
        let memberList = [];
        res.result.map((user) => {
          return memberList.push({
            text: user.username,
            value: user.username,
            url: 'mailto:' + user.email,
          });
        });
        setMembers(memberList);
      });
    }
  }, []);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onPostComment = async () => {
    let comment = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    comment = comment.replace(/<a[^>]*>@/g, 'user#').replace(/<\/a>/g, ' ');

    if (comment === "<p></p>\n") return;

    // File
    if (docName) {
      await postCommentFile({ projectId, docName: encodeURIComponent(docName), comment }).then(() => {
        setEditorState(EditorState.createEmpty());
        onPost();
      });
      return;
    }

    // Task
    if (projectId !== activityId) {
      await postCommentTask({ projectId, activityType, activityId, comment }).then(
        () => {
          setEditorState(EditorState.createEmpty());
          onPost();
        }
      );
      return;
    }

    // Project
    await postCommentProject({projectId, comment}).then(() => {
      setEditorState(EditorState.createEmpty());
      onPost();
    });
  };

  const sendMessageToUser = async () => {
    let comment = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    comment = comment.replace(/<a[^>]*>@/g, 'user#').replace(/<\/a>/g, ' ');
    onMessageSend({ comment, recipientId });

    setEditorState(EditorState.createEmpty());
  };

  return (
    <WysiwygComponent>
      <div className="comment-user">
        <Avatar userDetails={profile} width={24} height={24} />
      </div>
      {sendMessage ? (
        <div className="comment-send" onClick={sendMessageToUser}>
          <CommentSend />
        </div>
      ) : (
        <div className="comment-send" onClick={onPostComment}>
          <CommentSend />
        </div>
      )}

      <Editor
        editorState={editorState}
        toolbarClassName="custom-wysiwyg-toolbar"
        wrapperClassName="custom-wysiwyg-wrapper"
        editorClassName="custom-wysiwyg-editor"
        onEditorStateChange={onEditorStateChange}
        placeholder="Add a comment..."
        toolbar={{
          options: ['inline', 'emoji', 'image', 'remove', 'link'],
          inline: {
            inDropdown: false,
            className: 'custom-wysiwyg-inline',
            options: ['bold', 'italic', 'underline'],
            bold: { icon: BoldText, className: 'custom-wysiwyg-bold' },
            italic: {
              icon: ItalicText,
              className: 'custom-wysiwyg-italic',
            },
            underline: {
              icon: Underline,
              className: 'custom-wysiwyg-underline',
            },
          },
          emoji: {
            icon: Emoji,
            className: 'custom-wysiwyg-emoji',
            popupClassName: 'custom-wysiwyg-emoji-popup',
          },
          image: {
            icon: PaperClip,
            className: 'custom-wysiwyg-clip',
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: true,
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
          remove: { icon: AtSignIcon, className: 'custom-wysiwyg-atsign' },
          link: {
            inDropdown: false,
            className: 'custom-wysiwyg-link',
            popupClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_blank',
            options: ['link'],
            link: { icon: Link },
            linkCallback: undefined,
          },
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: members.length > 0 ? members : [],
        }}
      />
    </WysiwygComponent>
  );
};

export default Wysiwyg;

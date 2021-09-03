import styled from 'styled-components';

export const WysiwygComponent = styled.div`
  position: relative;
  z-index: 1;
  .comment-user {
    position: absolute;
    top: 8px;
    left: 8px;
  }
  .comment-send {
    position: absolute;
    bottom: 8px;
    right: 16px;
    height: 24px;
    cursor: pointer;
  }
  .custom-wysiwyg-wrapper {
    display: flex;
    flex-direction: column-reverse;
    background: #fafafa;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    width: 100%;

    .custom-wysiwyg-toolbar {
      margin: 0;
      padding: 0 4px;
      border: transparent;
      border-top: 1px solid #dbdbdb;
      background: #fafafa;
      visibility: unset !important;
      height: 40px;
      align-items: center;
      .custom-wysiwyg-inline {
        margin: 0;
      }
      .rdw-emoji-wrapper,
      .rdw-remove-wrapper,
      .rdw-image-wrapper {
        margin: 0;
        position: absolute;
      }

      .rdw-emoji-wrapper {
        right: 184px;
      }

      .rdw-image-wrapper {
        right: 144px;
      }

      .rdw-remove-wrapper {
        right: 104px;
      }

      .custom-wysiwyg-bold,
      .custom-wysiwyg-italic,
      .custom-wysiwyg-underline,
      .custom-wysiwyg-link,
      .custom-wysiwyg-emoji,
      .custom-wysiwyg-atsign,
      .custom-wysiwyg-clip {
        background: none;
        margin: 0;
        padding: 12px 4px;
        border: transparent;
        border-radius: 5px;
        box-shadow: none;
        min-width: unset;
      }
      .custom-wysiwyg-italic,
      .custom-wysiwyg-bold,
      .custom-wysiwyg-underline {
        margin: 0;
        min-width: unset;
        padding: 12px 4px;
        margin: 0px 16px;
      }
      .custom-wysiwyg-bold:hover,
      .custom-wysiwyg-italic:hover,
      .custom-wysiwyg-underline:hover,
      .custom-wysiwyg-link:hover,
      .custom-wysiwyg-emoji:hover,
      .custom-wysiwyg-atsign:hover,
      .custom-wysiwyg-clip:hover {
        background: #edf5f6;
      }
      .custom-wysiwyg-link {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        padding: 4px;
        right: 64px;
        .rdw-option-wrapper {
          padding: 0;
          margin: 0;
          border: transparent;
          background: transparent;
          box-shadow: none;
          height: 16px;
          min-width: unset;
        }
      }

      .rdw-emoji-modal {
        top: -180px;
      }

      .rdw-image-modal {
        top: -215px;
      }

      .rdw-link-modal {
        left: -200px;
        top: -205px;
      }

      .rdw-link-modal-target-option {
        margin-bottom: 10px;
      }
    }

    .custom-wysiwyg-editor {
      min-height: 64px;
      padding-left: 40px;
      font-size: 14px;
      line-height: 16px;
      color: #636363;
      font-weight: 400;
      overflow: unset;

      a {
        color: #089bab;
        font-weight: 400;
        overflow: unset;
        font-family: Poppins, sans-serif;
        font-style: normal;
        font-weight: normal;
        line-height: 1rem;
        font-size: 0.75rem;
        color: var(--text-normal);
      }

      .public-DraftEditorPlaceholder-inner {
        font-family: Poppins, sans-serif;
        font-style: normal;
        font-weight: normal;
        line-height: 1rem;
        font-size: 0.75rem;
        color: #636363;
      }

      a {
        color: #089bab;
      }

      .public-DraftStyleDefault-block {
        //max-height: 40px;
        overflow-wrap: anywhere;
        padding-right: 1rem;
        span {
          background-color: #fafafa !important;
        }
      }

      .rdw-suggestion-dropdown {
        max-height: 92px;
        color: #089bab;
      }
    }
  }
`;

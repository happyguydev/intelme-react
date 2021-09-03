import styled from 'styled-components';

export const DropdownContainer = styled.div`
  .menuContainer {
    background: var(--teal-light);
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: -0.2px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: var(--text-normal);
    width: 261px;
    max-height: unset;
    li {
      max-width: 20rem;
    }
    .rc-menu__divider {
      background-color: var(--gray-light);
      margin-bottom: 0;
    }
    & > li:first-child {
      //border-bottom: 1px solid var(--gray-light);
      padding: 0.75rem 1.5rem 0;
      font-size: 1rem;
      .MuiCheckbox-root {
        padding: 0;
        margin-right: 10px;
      }
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  .menuButton {
    padding: 0;
    background: transparent;
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--teal-primary);
    list-style: none;
    display: flex;
    align-items: center;
    justify-self: center;
    transition: background 0.3s;
    border: transparent;
    cursor: pointer;
    &.empty {
      border: transparent;
      background: transparent;
      color: grey;
    }
    &:hover {
      background: transparent;
    }
    svg {
      color: var(--teal-primary);
      margin: 0 0 0 1rem;
      width: 1rem;
      height: 1rem;
    }
  }
  .active {
    color: var(--teal-primary);
    padding: 0.75rem 1.5rem;
    &:hover {
      background: none;
    }
    svg {
      width: 24px;
      min-width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }

  .default {
    transition: color 0.3s;
    padding: 0.75rem 1.5rem;
    max-width: auto;
    &:hover {
      background: none;
      color: var(--teal-primary);
    }
    svg {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      min-width: 24px;
    }
  }

  // SECOND TYPE STYLE

  .menuWhiteContainer {
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: var(--white);
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.25rem;
    letter-spacing: -0.2px;
    color: var(--text-normal);
  }
`;

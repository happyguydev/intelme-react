import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-bottom: 1.875rem;

  & > div:first-child {
    margin-right: 2rem;
  }
`;

import { BadDataStateComponentProps } from '@/interfaces/props/component-props/bad-data-state-component-props.interface';
import styled from 'styled-components';

const BadDataStateStyling = styled.div`
    .link-span {
        text-decoration: underline;
        color: blue;
    }
`;

export default function BadDataState({badDataItemsString}: BadDataStateComponentProps): any {

  if (badDataItemsString) {
    return (
        <>
       <BadDataStateStyling
         className="white-text">
            Sorry, there was an issue loading {badDataItemsString}, please try refreshing the page or check back later
        </BadDataStateStyling>
        </>
      )
  }
}

import { EmptyStateComponentProps } from '@/interfaces/props/empty-state-component-props.interface';
import Link from "next/link";
import styled from 'styled-components';

const EmptyStateStyling = styled.div`
    .link-span {
        text-decoration: underline;
        color: blue;
    }
`;

export default function EmptyState({emptyItem, navLink}: EmptyStateComponentProps) {

  console.log(emptyItem, navLink);

  if (emptyItem) {
    return (
        <>
       <EmptyStateStyling>
            Sorry, there are no {emptyItem}s to display. Add a {emptyItem} by <span className="link-span"><Link href={navLink}>clicking here</Link></span>
        </EmptyStateStyling>
        </>
      )
  }
}

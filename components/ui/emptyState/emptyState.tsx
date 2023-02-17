import { EmptyStateComponentProps } from '@/interfaces/props/component-props/empty-state-component-props.interface';
import Link from "next/link";
import styled from 'styled-components';

const EmptyStateStyling = styled.div`
    .link-span {
        text-decoration: underline;
        color: blue;
    }
`;

export default function EmptyState({pluralizedEmptyItem, singularEmptyItem, navLink}: EmptyStateComponentProps): any {
    return (
        <>
       <EmptyStateStyling>
            Sorry, there are no {pluralizedEmptyItem} to display. Add a {singularEmptyItem} by <span className="link-span"><Link href={navLink}>clicking here</Link></span>
        </EmptyStateStyling>
        </>
      )
}

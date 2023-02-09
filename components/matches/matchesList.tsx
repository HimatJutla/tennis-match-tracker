import styled from 'styled-components';

export default function MatchesList(props: any) {

  console.log(props.matches);

  if (!props?.matches.length) {
    return (
        <>
            Sorry, there are no matches do display
        </>
      )
  }
}

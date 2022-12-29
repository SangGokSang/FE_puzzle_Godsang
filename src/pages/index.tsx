import { css } from "@emotion/react";

const cssThings = css`
  color: red;
`;

export default function Home() {
  return (
    <>
      <h1 css={cssThings}>hi zz</h1>
    </>
  );
}

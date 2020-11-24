import React from "react";

import TextTitle from "../components/text-title";

export default {
  title: "Typography",
};

export const Title = () => <div>
  <TextTitle>Text Title Bold True</TextTitle>
  <TextTitle bold={false}>Text Title Bold false</TextTitle>
</div>;

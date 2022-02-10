import React from "react";
import { UAParser } from 'ua-parser-js';

import { GetServerSideProps, NextPage } from "next";

type Props = {
  browser: string;
}

const PostsList:NextPage<Props> = (props) => {
  return (
    <div>
      Your browser is:{props.browser}
    </div>
  )
}

export default PostsList;

export const getServerSideProps:GetServerSideProps = async(context) => {
  const ua = context.req.headers['user-agent'];
  const browserName = UAParser(ua).browser.name;
  return {
    props: {
      browser: browserName,
    }
  }
}

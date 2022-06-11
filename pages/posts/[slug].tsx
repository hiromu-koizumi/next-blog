import dayjs from "dayjs";
import { useEffect } from "react";

import Layout from "../../components/layout";
import { Tags } from "../../components/tags";
import { client } from "../../lib/client";

export default function BlogDetail({ blog }: any) {

  return (
    <Layout>
      <div>
        <div className="container w-full md:max-w-3xl mx-auto pt-20">

          <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
            <h1 className='text-2xl md:text-3xl font-bold'>{blog.title}</h1>
            <p className='pt-4'>{dayjs(blog.updatedAt).format('YYYY-MM-DD')}</p>
            {/* タグ */}
            <Tags tags={blog.tags} />

            <div
              className='pt-6'
              dangerouslySetInnerHTML={{
                __html: `${blog.content}`,
              }}
            />
          </div>



        </div>
        {/* tag blogs */}
      </div>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content: any) => `/posts/${content.slug}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });
  return {
    props: {
      blog: data.contents[0],
    },
  };
};
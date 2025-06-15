import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend PR - Page Router</title>
        <meta name="description" content="Next.js Page Router Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frontend PR
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            基于 Next.js Page Router 架构
          </p>
          <div className="space-x-4">
            <a
              href="/article/demo"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              查看文章示例
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
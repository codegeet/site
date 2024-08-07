import Playground from "@/components/playground"

export const metadata = {
  title: "Live Demo",
}

export default function DemoPage() {

  return (<>
    <section id="live-demo" className="container  md:py-2 lg:py-4">
      <div className="mx-auto flex max-w-[64rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Live            <span className='text-orange-500'>
              Demo
            </span>
        </h2>
        
          <Playground />
      </div>
    </section>
  </>

  )
}
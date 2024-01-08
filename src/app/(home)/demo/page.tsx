import { Button } from "@/components/ui/button"
import Playground from "@/components/playground"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Sorry, the{" "}<span className='text-orange-500'>
            demo
          </span>{" "}is currently{" "}<span className='text-orange-500'>
            unavailable
          </span>.
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          However, we are working to make it black to you soon.
        </p>
      </div>
      
      <section id="live-demo" className="container py-8 md:py-12 lg:py-24 hidden">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Live Demo
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Something about supported languages.
          </p>

          <div className="grid w-full items-start gap-10 rounded-lg border p-6 ">
            <Playground code={'Demo'} />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="jaav">Java</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button>Execute</Button>
          </div>

        </div>
      </section>

    </section>
  )
}
import { Letter } from "react-letter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function EmailDetailSheet({
  name,
  subject,
  body,
  label,
  children,
}: {
  name: string;
  subject: string;
  body: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-[540px] xl:w-[1000px] xl:max-w-none">
        <SheetHeader>
          <SheetTitle className="text-xl flex justify-between">
            <div>{name}</div>
            <div>{label}</div>
          </SheetTitle>
          <SheetDescription className="text-lg">{subject}</SheetDescription>
        </SheetHeader>
        <div
          id="emailRender"
          className="border-2 rounded-md p-2 my-2 dark:bg-white overflow-scroll max-h-[85%]"
        >
          <Letter html={body} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <div className="w-full flex justify-center items-center">
              <Button type="submit" size={"lg"} className="m-2">
                Close
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

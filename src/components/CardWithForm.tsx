import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function CardWithForm() {
    return (
        <Card className="dark:bg-neutral-700 w-[350px]">
            <CardHeader>
                <CardTitle>ADD LINKS</CardTitle>
                <CardDescription>Deploy your new links in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center  gap-4">
                        <div className="flex flex-col  space-y-1.5">
                            <Label htmlFor="name">Link</Label>
                            <Input id="name" placeholder="Add links" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Framework</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                    <SelectValue className="dark:bg-neutral-600" placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="web">Web Designing</SelectItem>
                                    <SelectItem value="Graphic">Graphic Designing</SelectItem>
                                    <SelectItem value="AI">AI Tools</SelectItem>
                                    <SelectItem value="Indian">Indian News</SelectItem>
                                    <SelectItem value="Sports">Sports</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    )
}

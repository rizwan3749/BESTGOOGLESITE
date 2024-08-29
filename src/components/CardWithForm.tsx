import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export function CardWithForm() {
  const [link, setLink] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [links, setLinks] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchLinks(); // Fetch links when user is authenticated
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchLinks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "links"));
      const fetchedLinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Error fetching links: ", error);
      alert("Error fetching links.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link || !category || !user) return;

    try {
      await addDoc(collection(db, "links"), {
        link,
        category,
        createdAt: new Date(),
        createdBy: user.uid,
      });

      setLink("");
      setCategory("");
      alert("Bookmark added successfully!");

      // Refresh the links after adding a new one
      fetchLinks();
    } catch (error) {
      console.error("Error adding bookmark: ", error);
      alert("Error adding bookmark.");
    }
  };

  return (
    <div className="flex flex-grow justify-between min-h-[90vh]">
      <div className="grow-0 h-full ">
        <Card className="dark:bg-neutral-700 w-[350px]">
          <CardHeader>
            <CardTitle>ADD BOOKMARK</CardTitle>
            <CardDescription>
              Add your new bookmark in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    placeholder="Add links"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select
                    onValueChange={(value) => setCategory(value)}
                    value={category}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue
                        className="dark:bg-neutral-600"
                        placeholder="Select"
                      />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="WEB DESIGNING">
                        Web Designing
                      </SelectItem>
                      <SelectItem value="GRAPHIC DESIGNING">
                        Graphic Designing
                      </SelectItem>
                      <SelectItem value="AI TOOLS">AI Tools</SelectItem>
                      <SelectItem value="INDIAN NEWS">Indian News</SelectItem>
                      <SelectItem value="SPORTS">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setLink("");
                    setCategory("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Deploy</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="grow-3 h-full p-4">
        <Card className="dark:bg-neutral-700 w-full">
          <CardHeader>
            <CardTitle>Saved Bookmarks</CardTitle>
            <CardDescription>All your saved bookmarks.</CardDescription>
          </CardHeader>
          <CardContent>
            {links.length > 0 ? (
              <ul>
                {links.map((linkItem, index) => (
                  <li key={index} className="mb-2">
                    <strong>Link:</strong>{" "}
                    <a href={linkItem.link} target="_blank">
                      {linkItem.link}
                    </a>
                    <br />
                    <strong>Category:</strong> {linkItem.category}
                    <br />
                    <strong>Added on:</strong>{" "}
                    {new Date(
                      linkItem.createdAt.seconds * 1000
                    ).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookmarks available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

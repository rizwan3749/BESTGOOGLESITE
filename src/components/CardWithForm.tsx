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
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "links", id));
      alert("Bookmark deleted successfully!");
      fetchLinks(); // Refresh links after deletion
    } catch (error) {
      console.error("Error deleting bookmark: ", error);
      alert("Error deleting bookmark.");
    }
  };

  const handleEdit = async (id, currentLink, currentCategory) => {
    const newLink = prompt("Enter new link:", currentLink);
    const newCategory = prompt("Enter new category:", currentCategory);

    if (newLink && newCategory) {
      try {
        await updateDoc(doc(db, "links", id), {
          link: newLink,
          category: newCategory,
        });
        alert("Bookmark updated successfully!");
        fetchLinks(); // Refresh links after editing
      } catch (error) {
        console.error("Error updating bookmark: ", error);
        alert("Error updating bookmark.");
      }
    }
  };

  // Group links by category
  const groupedLinks = links.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <div className="flex flex-grow justify-between min-h-[90vh]">
      <div className="grow-0 h-full">
        <Card className="dark:bg-neutral-700 w-[350px]">
          <CardHeader>
            <CardTitle>ADD BOOKMARK</CardTitle>
            <CardDescription>Add your new bookmark in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    placeholder="Add links"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="framework">Framework</Label>
                  <Select
                    onValueChange={(value) => setCategory(value)}
                    value={category}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue className="dark:bg-neutral-600" placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="WEB DESIGNING">Web Designing</SelectItem>
                      <SelectItem value="GRAPHIC DESIGNING">Graphic Designing</SelectItem>
                      <SelectItem value="AI TOOLS">AI Tools</SelectItem>
                      <SelectItem value="INDIAN NEWS">Indian News</SelectItem>
                      <SelectItem value="SPORTS">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardFooter className="flex mt-3 justify-between">
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
      <div className=" grow-3 h-full grid-rows-2  p-4 space-y-4">
        {Object.keys(groupedLinks).map((category, idx) => (
          <Card key={idx} className="dark:bg-neutral-700 w-full">
            <CardHeader>
              <CardTitle>{category} Bookmarks</CardTitle>
              <CardDescription>All your saved bookmarks in {category}.</CardDescription>
            </CardHeader>
            <CardContent>
              {groupedLinks[category].map((linkItem) => (
                <div
                  key={linkItem.id}
                  className="flex justify-between items-center p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 mb-2"
                >
                  <div>
                    <div><strong>Link:</strong> <a href={linkItem.link} target="_blank">{linkItem.link}</a></div>
                    <div><strong>Added on:</strong> {new Date(linkItem.createdAt.seconds * 1000).toLocaleString()}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(linkItem.id, linkItem.link, linkItem.category)}
                      className="px-4 py-2 ml-3 bg-neutral-600 text-white rounded-lg"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(linkItem.id)}
                      className="px-4 py-2 bg-neutral-600 text-white rounded-lg"
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

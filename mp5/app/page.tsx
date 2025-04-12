"use client"
import createNewUrl from "@/lib/createNewUrl";
import { useEffect, useState } from "react";

export default function Home() {
  const [alias, setAlias] = useState("");
  const [url, setUrl] = useState("");

  const [display, setDisplay] = useState(false);
  const [newURL, setNewUrl] = useState("");
  const [warning, setWarning] = useState("");

  const [currPath, setCurrPath] = useState("");

  useEffect(() => {
    setCurrPath(window.location.href);
  },[])

  function handleClick() {
    if (url === "" || alias === "") {
      setWarning("Missing Input");
      return null;
    }

    try {
      new URL(url);
    } catch {
      setWarning("Invalid URL");
      return null;
    }

    createNewUrl(alias, url).then((result) => {
      if (!result) {
        setWarning("Alias already exist");
      } else {
        setWarning("");
        setDisplay(true);
        setNewUrl(currPath + result.alias);
      }
    });
  }

  function handleCopy() {
    navigator.clipboard.writeText(newURL);
    alert("Copied the text: " + newURL);
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="h-1/2 text-2xl">
        <p className="text-red-500 text-center">{warning}</p>
        <label className="w-4/5 m-auto mb-4 flex flex-nowrap justify-center">Original URL:<input onChange={(e) => setUrl(e.target.value)} className="border w-150 ml-2 px-1.5" placeholder="URL"/></label>
        <label className="w-4/5 m-auto mb-4 flex flex-nowrap justify-center">{currPath}<input onChange={(e) => setAlias(e.target.value)} className="border w-80 ml-2 px-1.5" placeholder="Unique Alias"/></label>
        <div className="w-full flex justify-center">
          <button onClick={handleClick} className="text-white font-bold rounded w-20 m-auto mb-4 cursor-pointer p-2 bg-sky-400 hover:bg-sky-500">Enter</button>
        </div>
        <p className={"text-center " + (display ? "" : "hidden")}>
          New URL: 
          <a href={newURL} target="_blank" className="underline ml-2">{newURL}</a>
          <button className="text-white font-bold rounded ml-4 border p-2 cursor-pointer bg-sky-400 hover:bg-sky-500" onClick={handleCopy}>Copy</button>
        </p>
      </div>
    </div>
  );
}

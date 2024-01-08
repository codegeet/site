"use client";

import { Editor } from "@monaco-editor/react";

interface PlaygroundProps {
    code: string;
}

const Playground = ({ code }: PlaygroundProps) => {
    return (
        <Editor height="15vh"  defaultLanguage="javascript"
            defaultValue={code}
            theme="vs-dark"
            options={{
                fontSize: 14,
                minimap: {
                    enabled: false
                },
               // contextmenu: false
            }}
        />
    )
}

export default Playground;
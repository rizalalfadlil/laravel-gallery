import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import UploadForm from "@/Components/uploadForm";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Gallery({ images }) {

    const groupedImages = images.reduce((result, image) => {
        if (!result[image.album]) {
            result[image.album] = [];
        }
        result[image.album].push(image);
        return result;
    }, {});
    const [selected, setselected] = useState(null);
    const [moveInput, setmoveInput] = useState("");

    const params = new URLSearchParams(window.location.search);
    const album = params.get("album");

    const deleteData = async (id) => {
        const response = await axios.delete(`/delete/${id}`);
        console.log(response);
        window.location.reload();
    };

    const moveImage = async (id, album) => {
        const response = await axios.put(`/move/${id}`, { album });
        console.log(response);
        window.location.reload();
    };
    return (
        <>
            <Head title="Gallery" />
            <main className="p-4 space-y-20 md:px-20 xl:px-60 2xl:px-80 relative">
                <div className="gallery-container space-y-20">
                    {album && (
                        <PrimaryButton
                            onClick={() => (window.location.href = "/images")}
                        >
                            back
                        </PrimaryButton>
                    )}
                    {Object.keys(groupedImages).map((album) => (
                        <div key={album} className="">
                            <h2
                                className="text-xl font-bold rounded-lg bg-slate-200 p-4 px-8 my-4"
                                onClick={() =>
                                    (window.location.href = `/images?album=${album}`)
                                }
                            >
                                <span>{album}</span>
                            </h2>
                            <div className="grid gap-4 w-full grid-cols-2 md:grid-cols-4">
                                {groupedImages[album].map((image, index) => (
                                    <div
                                        onClick={() => setselected(image.id)}
                                        className={`w-full space-y-2 p-1 rounded-md ${
                                            selected === image.id
                                                ? "border-2 border-black"
                                                : ""
                                        }}`}
                                    >
                                        <div
                                            key={index}
                                            className="w-full aspect-square rounded bg-cover bg-center bg-no-repeat"
                                            style={{
                                                backgroundImage: `url('${image.file.replace(
                                                    "public",
                                                    "storage"
                                                )}')`,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* <img src="http://127.0.0.1:8000/storage/files/1719641730_screenshot-localhost_3000-2024.06.24-11_19_35.png" alt="img" /> */}
                {!album && (
                    <div>
                        <p className="text-xl font-bold rounded-lg bg-slate-200 p-4 my-4">
                            Upload new image
                        </p>
                        <UploadForm />
                    </div>
                )}
                {selected && (<div className="fixed bottom-2 p-4 bg-slate-200 rounded-md w-inherit grid md:flex border shadow-md gap-4 items-center">
                    <p className="text-lg font-bold">selected : {selected} </p>
                    <div className="grid md:flex gap-4">
                        <TextInput
                            value={moveInput}
                            onChange={(e) => setmoveInput(e.target.value)}
                        />
                        <PrimaryButton
                            onClick={() => moveImage(selected, moveInput)}
                            disabled={moveInput === '' || selected === null}
                        >
                            move
                        </PrimaryButton>
                    </div>
                    <DangerButton
                        className="py-3"
                        disabled={selected === null}
                        onClick={() => deleteData(selected)}
                    >
                        delete
                    </DangerButton>
                    <PrimaryButton onClick={()=>setselected(null)}>x</PrimaryButton>
                </div>)}
            </main>
        </>
    );
}

import React, { useRef, useState } from 'react'

//refValue.xurrent.value==>file ka fake path;
//preview==> file is converted into url
//file ={path,size,mimeType}


const FileUpload = ({formData,setFormData}) => {
    const refVal=useRef(null);
    const [preview,setPreview]=useState("");


    function handleFileChange(){
        const file=refVal.current.files[0];

        setFormData((prev)=>(
            {
                ...prev,
                thumbnail:file
            }
        ));

        const reader=new FileReader();
        
        reader.onload=(e)=>{
            const fileUrl=reader.result;
            setPreview(fileUrl)
        }
        reader.readAsDataURL(file);

    }

    function clearPreview(){
        refVal.current.value=null;
        setPreview("");
    }

    return (
        <div class="flex flex-col items-center justify-center w-full gap-4">
            
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-46 bg-neutral-secondary-medium border border-gray-400 border-default-strong rounded-2xl cursor-pointer hover:bg-neutral-tertiary-medium">
                <div class="flex flex-col items-center justify-center text-body pt-5 px-2 pb-6">
                    <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                    <p class="mb-2 text-sm"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs">SVG, PNG, JPG </p>
                </div>
                <input id="dropzone-file" ref={refVal} type="file" class="hidden"  onChange={handleFileChange} />
            </label>
            {
                preview && <div className='flex flex-col gap-4 items-center'>
                    <img src={preview} className='h-36 w-36 rounded'></img>
                    <button className='border w-1/4 rounded' onClick={clearPreview}>❌</button>
                </div>
            }
        </div>
    )
}

export default FileUpload
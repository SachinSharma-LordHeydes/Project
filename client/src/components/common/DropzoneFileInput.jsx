

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import HighligthText from '../HomePage/HighligthText';
import { FiUploadCloud } from 'react-icons/fi';



// const FileUploadWithPreview = ({setValue,courseDetails}) => {

//   const {currentStep}=useSelector((state)=>state.profile)
//   const {thumbnailPreview}=useSelector((state)=>state.course)

//   const dispatch=useDispatch();

//   const [filePreview, setFilePreview] = useState(null); 
//   const [fileType, setFileType] = useState(null);


//   // Handle file drop
//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const previewUrl = URL.createObjectURL(file);

//     dispatch(setThumbnailPreview(previewUrl))
//     console.log("thumbnailPreview after setthumbnailPreview=>",thumbnailPreview)
//     console.log("file after setthumbnailPreview=>",file)
//     setFileType(file.type.split('/')[0]);
//     setValue('thumbnail', file , { shouldValidate: true });
//   }, [setValue]);


//   useEffect(()=>{
//     setValue('thumbnail', thumbnailPreview , { shouldValidate: true });
//   },thumbnailPreview)

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'image/*,video/*',
//     multiple: false,
//     disabled: false,
//   });

//   function setPreviewNull(){
//     console.log("clicked")
//   }


//   return (
//     <div  
//       className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center min-h-[200px] items-center flex justify-center bg-richblack-700">
//       <div {...getRootProps()}>
//         <input {...getInputProps()}  name='thumbnail'  />

//         <div>
//             {
//               thumbnailPreview ? (
//                 <div>
//                   {fileType === 'image' ? (
//                     <img src={thumbnailPreview} alt="Preview" className="max-h-[200px] object-cover" />
//                   ) : fileType === 'video' ? (
//                     <video controls className="max-h-[200px] object-cover">
//                       <source src={thumbnailPreview} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : 
//                   <div>
//                     <img src={thumbnailPreview} alt="Preview" className="max-h-[200px] object-cover" />
//                   </div>
//                   }
//                 </div>
//               ) : (
//                 <div className='space-y-5 text-richblack-200'>
//                   <div className='mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]'>
//                     <div className='bg-richblack-800 rounded-full p-3'>
//                       <FiUploadCloud size={40} color='yellow' />
//                     </div>
      
//                     <div>
//                       <p className='text-sm'>Drag and drop an image or video, or click to <HighligthText text={'Browse'} colour={'bg-yellow-50'} /></p>
//                     </div>
//                   </div>
//                   <div>
//                     <ul className='flex text-xs justify-between list-disc'>
//                       <li>Aspect ratio 16:9</li>
//                       <li>Recommended size 1024x576</li>
//                     </ul>
//                   </div>
//                 </div>
//               )
//             }
//         </div>
//       </div>

//       {/* {
//         filePreview?
//         (
//           <div className='mt-2 text-yellow-50'>
//             <button onClick={setPreviewNull} className='border-b border-b-yellow-5'>Cancle</button>
//           </div>
//         ):
//         (
//           <div/>
//         )
//       } */}
//     </div>
//   );
// };

const FileUploadWithPreview = ({setValue, courseDetails, register, clearErrors,thumbnailPreview,videoPreview}) => {

  // const {editOrNextStatus}=useSelector((state)=>state.course)
  const {editOrNextStatus,editOrNextStatusOfVideo}=useSelector((state)=>state.profile)

  const dispatch=useDispatch();

  const [filePreview, setFilePreview] = useState(null); 
  const [fileType, setFileType] = useState(null);

  useEffect(()=>{
    console.log("mode=>",videoPreview,editOrNextStatusOfVideo)
    if(editOrNextStatus===0 && thumbnailPreview){
      setFilePreview(thumbnailPreview)
    }
    if(editOrNextStatusOfVideo===0 && videoPreview){
      setFilePreview(videoPreview)
    }
    console.log("previewurl=>",filePreview)
  },[thumbnailPreview,videoPreview])


  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("acceptef Files=> ",acceptedFiles)
    const acceptedFileType=acceptedFiles[0].type.split('/')[0]
    setFileType(acceptedFileType)
    console.log("filetype=> ",acceptedFileType)
    console.log("filetype=> ",fileType)

    const previewUrl = URL.createObjectURL(file);
    setFilePreview(previewUrl)
    setValue('thumbnail', file);
  }, [setValue,fileType ]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,video/*',
  });

  function setPreviewNull(){
    console.log("clicked")
    setFilePreview(null);
  }


  return (
    <div  
      className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center min-h-[200px] items-center flex justify-center bg-richblack-700 flex-col">
      <div className='' {...getRootProps()}>
        <input {...getInputProps()}  name='thumbnail'  />

        <div>
            {
              filePreview ? (
                <div>
                  {fileType === 'image' ? (
                    <img src={filePreview} alt="Preview img" className="max-h-[200px] object-cover" />
                  ) : fileType === 'video' ? (
                    <video controls className="max-h-[200px] object-cover">
                      <source src={filePreview} alt="Preview vid" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : 
                  <div>
                    {
                      videoPreview?
                      (
                        <div>
                          <video controls className="max-h-[200px] object-cover">
                            <source src={filePreview} alt="Preview vid" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )
                      :
                      (
                        <div>
                          <img src={filePreview} alt="Preview url" className="max-h-[200px] object-cover" />
                        </div>
                      )
                    }
                  </div>
                  }
                </div>
              ) : (
                <div className='space-y-5 text-richblack-200'>
                  <div className='mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]'>
                    <div className='bg-richblack-800 rounded-full p-3'>
                      <FiUploadCloud size={40} color='yellow' />
                    </div>
      
                    <div>
                      <p className='text-sm'>Drag and drop an image or video, or click to <HighligthText text={'Browse'} colour={'bg-yellow-50'} /></p>
                    </div>
                  </div>
                  <div>
                    <ul className='flex text-xs justify-between list-disc'>
                      <li>Aspect ratio 16:9</li>
                      <li>Recommended size 1024x576</li>
                    </ul>
                  </div>
                </div>
              )
            }
        </div>
      </div>

      <div>
      {
        filePreview?
        (
          <div className='mt-2 text-yellow-50'>
            <button type='button' onClick={setPreviewNull} className='border-b border-b-yellow-5'>Cancle</button>
          </div>
        ):
        (
          <div/>
        )
      }
      </div>
    </div>
  );
};

export default FileUploadWithPreview;




 // return (
  //       <div  
  //         className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center min-h-[200px] items-center flex justify-center bg-richblack-700">
  //         <div {...getRootProps()}>
  //           <input {...getInputProps()}  name='thumbnail'  />

  //           <div>
  //             {
  //               courseDetails?.thumbnail && currentStep===1?
  //               <div>
  //                 <div>
  //                   <img src={courseDetails?.thumbnail} alt={`Preview pics`} className="max-h-[200px]" />
  //                 </div>
  //               </div>
  //               :
  //               <div>
  //                 {
  //                     filePreview ? (
  //                       <div>
  //                         {fileType === 'image' ? (
  //                           <img src={filePreview} alt="Preview" className="max-h-[200px]" />
  //                         ) : fileType === 'video' ? (
  //                           <video controls className="max-h-[200px]">
  //                             <source src={filePreview} type="video/mp4" />
  //                             Your browser does not support the video tag.
  //                           </video>
  //                         ) : null}
  //                       </div>
  //                     ) : (
  //                       <div className='space-y-5 text-richblack-200'>
  //                         <div className='mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]'>
  //                           <div className='bg-richblack-800 rounded-full p-3'>
  //                             <FiUploadCloud size={40} color='yellow' />
  //                           </div>
              
  //                           <div>
  //                             <p className='text-sm'>Drag and drop an image or video, or click to <HighligthText text={'Browse'} colour={'bg-yellow-50'} /></p>
  //                           </div>
  //                         </div>
  //                         <div>
  //                           <ul className='flex text-xs justify-between list-disc'>
  //                             <li>Aspect ratio 16:9</li>
  //                             <li>Recommended size 1024x576</li>
  //                           </ul>
  //                         </div>
  //                       </div>
  //                     )
  //                   }
  //               </div>
  //             }
  //           </div>
  //         </div>

  //         {/* {
  //           filePreview?
  //           (
  //             <div className='mt-2 text-yellow-50'>
  //               <button onClick={setPreviewNull} className='border-b border-b-yellow-5'>Cancle</button>
  //             </div>
  //           ):
  //           (
  //             <div/>
  //           )
  //         } */}
  //       </div>
  //     );
  //   };
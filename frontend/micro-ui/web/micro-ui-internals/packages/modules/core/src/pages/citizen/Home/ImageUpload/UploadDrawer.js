import React ,{useState,useEffect}from 'react'
import{UploadFile} from '@egovernments/digit-ui-react-components';
const scss={
  height:"150px",
  width:'100%'
}

function UploadDrawer() {
  const [uploadedFile, setUploadedFile] = useState("a");
    const [file,setFile] = useState("")
    function selectfile(e) {
      console.log( setFile(e.target.files[0]))
        

      }
      console.log("demo",uploadedFile)
      const [error, setError] = useState(null);
      const removeimg=()=>{
        setUploadedFile("null")
      }
      useEffect(() => {
        (async () => {
          setError(null);
          if (file) {
            if (file.size >= 2000000) {
              setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
            } else {
              try {
                // TODO: change module in file storage
                const response = await Digit.UploadServices.Filestorage("citizen-profile", file, Digit.ULBService.getStateId());                if (response?.data?.files?.length > 0) {
                  setUploadedFile(response?.data?.files[0]?.fileStoreId);
                } else {
                  setError(t("FILE_UPLOAD_ERROR"));
                }
              } catch (err) {
                console.error("Modal -> err ", err);
                // setError(t("PT_FILE_UPLOAD_ERROR"));
              }
              console.log("demo1",uploadedFile)
            }
          }
        })();
      }, [file]);
  return (
    <div style={{bottom:'0',height:'150px',justifyContent:"space-around",backgroundColor:"white"}}>
      <div>
      <UploadFile
        extraStyleName={"propertyCreate"}
        accept=".jpg,.png,.pdf"
        onUpload={selectfile}
        // onDelete={() => {
        //   setUploadedFile(null);}} />UploadDrawer
      />
      </div>
      <div onClick={removeimg}>remove</div>
    </div>
  )
}

export default UploadDrawer
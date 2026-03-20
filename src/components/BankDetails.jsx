import React,{useState, useEffect} from 'react'
import {Card,Form, Descriptions, Button, Space,Input, message, Typography} from "antd";
import axios from 'axios';
const {Title, Text}=Typography;

const BankDetails = ({bankDetails,ccode ,onPrev, onNext,onUpdate}) => {
    const [editing, setEditing]= useState(false);
    const [loading, setLoading]=useState(false);
    const [form]= Form.useForm();
    useEffect(()=>{
        if(bankDetails){
            form.setFieldsValue(bankDetails);
        } 
    },[bankDetails]);
    
    const handleCancel=()=>{
        form.setFieldsValue(bankDetails);
        setEditing(false);
    }

    const handleSave=async()=>{
        try{
            setLoading(true);
            const values= await form.validateFields();
            const res=await axios.put(
                `http://localhost:5000/api/college/${ccode}/bank`,
                values
            );
            message.success("Bank details updated");
            if(onUpdate)
                onUpdate(res.data);
            setEditing(false);
        }
        catch(err){
            message.error("Update failed in BankDetails page");
        }
        finally{
            setLoading(false);
        }
    };

    if(!bankDetails||Object.keys(bankDetails).length===0){
        return <Text>No bank details available</Text>;
    }

    const BANK_LABEL={
        Bank1:"TFC Upward",
        Bank2:"7.5% Quota",
    };

    const isChanged= JSON.stringify(form.getFieldsValue())!== JSON.stringify(bankDetails);

  return (
    <Card>
        <Title level={3} style={{marginBottom:16, textAlign:"center"}}>Bank Details</Title>

        <Form form={form} layout="vertical">
            {Object.entries(bankDetails).map(([bankKey,bankValue])=>(
                <div
                    key={bankKey}
                    className="mb-6 rounded-lg border border-gray-200 p-4"
                >
                    <Title level={4} style={{marginBottom:20, marginTop:10}}>For {BANK_LABEL[bankKey]||bankKey}</Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <Form.Item label="Bank Name" name={[bankKey, "Name"]} rules={[{required:true}]}>
                            <Input disabled={!editing}/>
                        </Form.Item>
                         <Form.Item label="Account Number" name={[bankKey, "AccNo"]} rules={[{required:true}]}>
                            <Input disabled={!editing}/>
                        </Form.Item>
                         <Form.Item label="IFSC Code" name={[bankKey, "IFSC"]} rules={[{required:true}]}>
                            <Input disabled={!editing}/>
                        </Form.Item>
                        <Form.Item label="Account Holder Name" name={[bankKey, "Holder"]} rules={[{required:true}]}>
                            <Input disabled={!editing}/>
                        </Form.Item>
                        <Form.Item label="Branch" name={[bankKey, "Branch"]} rules={[{required:true}]}>
                            <Input disabled={!editing}/>
                        </Form.Item>
                    </div>
                </div>
            ))}
        </Form>
        <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={onPrev} disabled={!onPrev}>
              &lt; Previous
            </Button>
    
            <Space>
              {!editing ? (
                <Button type="primary" onClick={()=> setEditing(true)}>
                  Edit
                </Button>
              ):(
                <>
                  <Button onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleSave}
                    loading={loading}
                    disabled={!isChanged}
                  >
                    Save
                  </Button>
                </>
              )}
    
              <Button type="primary" onClick={onNext} disabled={editing}>
                Next &gt;
              </Button>
            </Space>
        </div>
    </Card>
  );
};

export default BankDetails;



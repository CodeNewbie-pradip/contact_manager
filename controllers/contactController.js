const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@acess public
const getContact=asyncHandler(async(req, res)=>{
    const contacts=await Contact.find();
    res.status(200).json({message:contacts});
});

//@desc create New contacts
//@route POST /api/contacts
//@acess public
const createContact=asyncHandler(async(req, res)=>{
    console.log("The request Body is: ",req.body);
    const{name, email, phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All field are required !");
        
    }
    const contact=await Contact.create({
        name, 
        email, 
        phone,
    });
    res.status(201).json(contact);
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@acess public
const getContacts=asyncHandler(async(req, res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not  found");
    }
    res.status(200).json(contact);
});

//@desc update contacts
//@route put /api/contacts/:id
//@acess public
const updateContact=asyncHandler(async(req, res)=>{ //use for repalce
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact)
});

//@desc delete contacts
//@route delete /api/contacts/:id
//@acess public
const deleteContact=asyncHandler(async(req, res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    await contact.remove()
    res.status(200).json("delete Contacts"); 
});

module.exports={
    getContact, 
    createContact, 
    getContacts, 
    updateContact,
    deleteContact
};
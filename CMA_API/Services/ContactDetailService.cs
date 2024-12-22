using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CMA_API.Services
{
    public class ContactDetailService
    {
        private readonly string _filePath;

        public ContactDetailService(string filePath)
        {
            _filePath = filePath;
        }

        // Read the JSON file and return a list of contacts
        private List<ContactDetails> GetData()
        {
            if (!File.Exists(_filePath))
                return new List<ContactDetails>();

            var json = File.ReadAllText(_filePath);
            return JsonConvert.DeserializeObject<List<ContactDetails>>(json);
        }

        // Write the list of contact back to the JSON file
        private void SaveData(List<ContactDetails> contactDetails)
        {
            var json = JsonConvert.SerializeObject(contactDetails, Formatting.Indented);
            File.WriteAllText(_filePath, json);
        }

        // Create a new contact
        public string CreateData(ContactDetails contactDetails)
        {
            string ResponseMessage = "";
            try
            {
                var data = GetData();
                if (contactDetails.id != 0)
                {
                    var contactDetailsExists = data.FirstOrDefault(u => u.id == contactDetails.id);
                    if (contactDetailsExists != null)
                    {
                        contactDetailsExists.firstName = contactDetails.firstName;
                        contactDetailsExists.lastName = contactDetails.lastName;
                        contactDetailsExists.email = contactDetails.email;
                    }
                    ResponseMessage = "Data Updated Successfully";
                }
                else
                {
                    contactDetails.id = data.Count > 0 ? data.Max(u => u.id) + 1 : 1; // Auto-increment id
                    data.Add(contactDetails);
                    ResponseMessage = "Data Added Successfully";
                }
                SaveData(data);                
            }
            catch (Exception ex) 
            {
                ResponseMessage = "Error while creating data " + ex.Message;
            }
            return ResponseMessage;
        }            

        // Get all contact details
        public List<ContactDetails> GetAllData()
        {
            return GetData();
        }

        // Delete a contact details by id
        public string DeleteData(int id)
        {
            string ResponseMessage = "";
            try
            {
                var data = GetData();
                var contactDetailsExists = data.FirstOrDefault(u => u.id == id);
                if (contactDetailsExists != null)
                {
                    data.Remove(contactDetailsExists);
                    SaveData(data);
                    ResponseMessage = "Data Deleted Successfully";
                }
                else
                {
                    ResponseMessage = "Data Not Found";
                }                
            }
            catch (Exception ex)
            {
                ResponseMessage = "Error while deleting data " + ex.Message;
            }
            return ResponseMessage;

        }
    }
}

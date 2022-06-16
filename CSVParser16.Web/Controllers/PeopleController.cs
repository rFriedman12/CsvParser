using CsvHelper;
using CSVParser16.Data;
using CSVParser16.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSVParser16.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        [Route("generate")]
        public IActionResult GeneratePeopleCsv(int amount)
        {
            var repo = new PeopleRepository();
            List<Person> people = repo.GeneratePeople(amount);
            byte[] csvAsBytes = Encoding.UTF8.GetBytes(GetCsv(people));
            return File(csvAsBytes, "text/csv", "People.csv");
        }

        [Route("upload")]
        public void UploadPeopleCsv(CsvUploadModel model)
        {
            int index = model.Base64.IndexOf(",") + 1;
            string base64People = model.Base64.Substring(index);
            byte[] peopleAsBytes = Convert.FromBase64String(base64People);
            List<Person> people = GetPeopleFromBytes(peopleAsBytes);
            var repo = new PeopleRepository();
            repo.AddPeople(people);
        }

        [Route("getall")]
        public List<Person> GetAllPeople()
        {
            var repo = new PeopleRepository();
            return repo.GetAllPeople();
        }

        [Route("deleteall")]
        public void DeleteAllPeople()
        {
            var repo = new PeopleRepository();
            repo.DeleteAllPeople();
        }


        private string GetCsv(List<Person> people)
        {
            var builder = new StringBuilder();
            var stringWriter = new StringWriter(builder);
            using var csvWriter = new CsvWriter(stringWriter, CultureInfo.InvariantCulture);
            csvWriter.WriteRecords(people);
            return builder.ToString();
        }

        private List<Person> GetPeopleFromBytes (byte[] peopleAsBytes)
        {
            using var memoryStream = new MemoryStream(peopleAsBytes);
            var streamReader = new StreamReader(memoryStream);
            using var reader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
            return reader.GetRecords<Person>().ToList();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSVParser16.Data
{
    public class PeopleRepository
    {
        private static int _nextId = 0;
        private static List<Person> _people = new(); 

        public List<Person> GeneratePeople(int amount)
        {            
            return Enumerable.Range(1, amount).Select(p =>
            {
                _nextId++;
                return new Person
                {
                    Id = _nextId,
                    FirstName = Faker.Name.First(),
                    LastName = Faker.Name.Last(),
                    Age = Faker.RandomNumber.Next(120),
                    Address = Faker.Address.StreetAddress() + Faker.Address.StreetName(),
                    Email = Faker.Internet.Email()
                };
            }).ToList();            
        }

        public void AddPeople(List<Person> people) => _people.AddRange(people);

        public List<Person> GetAllPeople() => _people;

        public void DeleteAllPeople() => _people.Clear();
    }
}

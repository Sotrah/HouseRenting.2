using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyShop.Controllers
{
    public class APIController : Controller
    {
        // GET: API
        public ActionResult GetData()
        {
            List<Person> Persons = new List<Person>();
            Persons.Add(new Person { Id = 1, Name = "Paddy", FavouriteColour = "Blue" });
            Persons.Add(new Person { Id = 2, Name = "Frank", FavouriteColour = "Brown" });

            return Json(Persons);
        }
    }

    class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FavouriteColour { get; set; }
    }
}
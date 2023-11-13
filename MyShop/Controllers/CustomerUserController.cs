using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyShop.DAL;
using MyShop.Models;
namespace MyShop.Controllers;

[Route("api/[controller]")]
[ApiController]

public class CustomerUserController : Controller
{
    private readonly ItemDbContext _itemDbContext;

    public CustomerUserController(ItemDbContext itemDbContext)
    {
        _itemDbContext = itemDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        List<CustomerUser> customerUsers = await _itemDbContext.CustomerUsers.ToListAsync();
        return Json(customerUsers);
    }
}

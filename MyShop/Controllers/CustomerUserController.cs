﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyShop.DAL;
using MyShop.Models;
namespace MyShop.Controllers;

public class CustomerUserController : Controller
{
    private readonly ItemDbContext _itemDbContext;

    public CustomerUserController(ItemDbContext itemDbContext)
    {
        _itemDbContext = itemDbContext;
    }

    public async Task<IActionResult> Table()
    {
        List<CustomerUser> customerUsers = await _itemDbContext.CustomerUsers.ToListAsync();
        return View(customerUsers);
    }

    public async Task<ActionResult> GetData()
    {
        List<CustomerUser> customerUsers = await _itemDbContext.CustomerUsers.ToListAsync();
        return Json(customerUsers);
    }
    public async Task<ActionResult> GetUser()
    {
        /*CustomerUser loggedInUser = await _itemDbContext.CustomerUsers.FindAsync("5124afd8-451c-49fc-a15a-ab784ece9256");
        return Json(loggedInUser); */
        CustomerUser loggedInUser = await _itemDbContext.CustomerUsers.FindAsync(Constants.DemoUserId);
        return Json(loggedInUser);
    }
}
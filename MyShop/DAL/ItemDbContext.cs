﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using MyShop.Models;
namespace MyShop.DAL;

public class ItemDbContext : ApiAuthorizationDbContext<CustomerUser>
{
    public ItemDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
        //Database.EnsureCreated();
    }

    public DbSet<Item> Items { get; set; }
    public DbSet<CustomerUser> CustomerUsers { get; set; }
    public DbSet<Booking> Bookings { get; set; }

    // Connect the items and bookings with a one to many relationship.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Item)
            .WithMany(i => i.Bookings)
            .HasForeignKey(b => b.ItemId);

        // Configuration for the relationship between Booking and User
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.CustomerUser)           // Booking has one User
            .WithMany(u => u.Bookings)      // User can have many Bookings
            .HasForeignKey(b => b.UserId);  // Booking's UserId is the foreign key

        modelBuilder.Entity<Item>()
                   .HasOne(b => b.CustomerUser)
                   .WithMany(u => u.Items)
                   .HasForeignKey(b => b.UserId);


        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
    }
}


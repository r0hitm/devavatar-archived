---
title: How to Effectively Configure DNS for Your GitHub Pages Website
description: A step-by-step guide to setting up a custom domain name with GitHub Pages using a domain name system (DNS).
date: 2023-02-11
tags: 
  - dns
  - web-development
  - jamstack
---

GitHub Pages is a great platform for hosting your website for free. However, the default URL for a GitHub Pages site is a subdomain of [GitHub.com](http://GitHub.com), which may not be suitable for everyone. In this tutorial, we will go over how to buy and set up a custom domain name with GitHub Pages using a domain name system (DNS).

**Step 1**: Buy a Domain Name

The first step in setting up a custom domain name with GitHub Pages is to buy a domain name. There are many domain registrars to choose from, including GoDaddy, Namecheap, and Google Domains. Simply search for "domain registrar" and choose one that you like.

**Bonus**: If you're a student, you can get a free domain name through the [GitHub Student Developer Pack](https://education.github.com/pack). The pack includes free domains from various registrars, including Namecheap.

**Step 2**: Add Host Records in the donain's DNS settings

Once you have your domain name, you will need to add few DNS records to your domain's DNS settings. This will associate your custom domain with your GitHub Pages site.

**Note**: If you got your domain through GitHub Student Developer Pack, then in most cases DNS records will be automatically created, if they're not follow the steps below:

Log in to your domain registrar's account and find the section for managing DNS records. And add the following records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-domain-name>` (example.com) |

You can also add `AAA` records for IPv6 support, use the following values, Host is `@` for each:

```plaintext
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**Step 3**: Add a Custom Domain to Your GitHub Pages Site

Next, go to the settings page for your GitHub Pages repository and scroll down to the "GitHub Pages" section. In the "Custom domain" field, enter your custom domain name. GitHub may prompt you to add a new `TXT` record to the DNS settings, go ahead and do that.

**Step 4**: Wait for DNS Propagation

DNS propagation can take anywhere from a few minutes to 24 hours. This is the time it takes for the new DNS records to be updated and recognized by the internet.

During this time, you can check the status of your DNS propagation by using a tool such as [WhatsMyDNS.net](http://WhatsMyDNS.net). Simply enter your custom domain name and check if the CNAME record is showing up correctly.

**Step 5**: Test Your Site

Once DNS propagation is complete, you should be able to access your site using your custom domain. Try visiting your custom domain in a web browser to make sure everything is set up correctly.

Congratulations! You now have a custom domain for your GitHub Pages site.
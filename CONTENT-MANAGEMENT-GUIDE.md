# 🎛️ Managing Floral Kingdom Website Content from WordPress

## 🚀 Quick Setup Instructions

### 1. **Add the Settings File**
Copy the `floral-kingdom-settings.php` file to your WordPress theme folder:
```
wp-content/themes/your-active-theme/floral-kingdom-settings.php
```

### 2. **Include in functions.php**
Add this line to your theme's `functions.php`:
```php
require_once get_template_directory() . '/floral-kingdom-settings.php';
```

### 3. **Access the Settings**
In your WordPress admin, go to:
**Settings → Website Content**

---

## 📋 What You Can Manage

### 🎯 **Default Tour Content**
- **Default Price**: `From R899` → Change to your preferred default pricing
- **Duration**: `Full Day` → Modify default tour duration
- **Group Size**: `Small Group` → Update default group size description
- **Rating**: `4.9` → Set default star rating (1-5)
- **Review Count**: `127` → Change default number of reviews

### 📧 **Contact Form Settings**
- **Contact Email**: Where form submissions are sent
- **Success Message**: Message shown after successful submission

### 💬 **Content Sections**
- **Hero Title**: Main homepage headline
- **Hero Subtitle**: Supporting text below title
- **About Section**: Description text for About Us
- **Tours Description**: Text for tours section

### 📱 **Social Media Links**
- **WhatsApp**: Your business WhatsApp number (with country code)
- **Facebook**: Facebook page URL
- **Instagram**: Instagram profile URL
- **X (Twitter)**: Twitter/X profile URL

### ⭐ **Testimonials**
- **Default Reviews**: JSON format customer testimonials
- Shown when no testimonials exist in database

---

## 🔄 How It Works

1. **WordPress Admin**: You edit content in the settings page
2. **API Endpoint**: Settings are served via `/wp-json/floral/v1/settings`
3. **Frontend**: React app fetches and uses these settings automatically
4. **Real-time**: Changes appear immediately on your website

---

## 📝 Example Usage

### Tour Defaults
When you create a new tour without specifying price, duration, etc., it will use your default values from the settings page.

### Dynamic Content
All text content (hero titles, descriptions, etc.) can be changed from WordPress admin without touching code.

### Social Links
Update your social media links anytime from the admin panel - they'll automatically update in the navigation and footer.

---

## 🛠️ Advanced Features

### Custom Fields for Tours
Add these custom fields to your tour posts for full control:
- `price` → Tour-specific pricing
- `duration` → Tour duration
- `group_size` → Group size description
- `rating` → Tour-specific rating
- `review_count` → Number of reviews

### Testimonials Management
You can:
1. Use the default testimonials in settings
2. Create a custom "Testimonials" post type
3. Import from a reviews plugin

---

## 🎨 Benefits

✅ **No Code Changes**: Update content through WordPress admin
✅ **Instant Updates**: Changes appear immediately
✅ **SEO Friendly**: Content is manageable and searchable
✅ **User Friendly**: Non-technical team members can update content
✅ **Consistent Branding**: Default values ensure consistency
✅ **Professional**: Clean separation of content and code

---

## 📞 Quick Tips

1. **Test Changes**: Always test after making changes
2. **Backup Settings**: Export your settings before major changes
3. **Consistent Formatting**: Keep pricing and descriptions consistent
4. **Image Optimization**: Use optimized images for better performance
5. **Mobile Testing**: Test content on mobile devices

---

This system gives you complete control over your website content without needing to touch code! 🎉
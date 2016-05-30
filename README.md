# Algorithmic Password Generator
A Bookmarklet creator for generating unique algorithm-based passwords on websites

Algorithm-based passwords are a convenient, less-secure means of using unique passwords on every site without a password manager. Because every password you need is different based on the usage criteria, you're more secure than using one password, and more able to determine the password when you're offline. 

# How does it work?
The system takes a user-defined variable (the salt) and combines it with the current domain name (gleaned from an instantly expired cookie). This combination is then SHA1 hashed and Base64 encoded to produce a set of characters to use for comparison against a set of input templates.

The input templates were based on http://masterpasswordapp.com/algorithm.html and many of the suggestions there were used.

# Is This Secure?
No. Using a system to generate your passwords is, by definition, less secure than a completely random approach. That said, using one password (or a few) for every site is much worse. I find the simplicity of this system and the variability of the passwords to be a reasonable compromise. Consider your own needs and make sure you understand the ramifications.


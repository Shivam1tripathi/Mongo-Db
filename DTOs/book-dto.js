class IssuedBook{
    _id;
    Name;
    Price;
    Genre;
    Publisher;
    issuedBy;
    issuedDate;
    returnDate;
    constructor(user){
        this._id=user.IssuedBook._id;
        this.Name=user.IssuedBook.Name;
        this.Price=user.IssuedBook.Price;
        this.Genre=user.IssuedBook.Genre;
        this.Publisher=user.IssuedBook.Publisher;
        this.issuedBy=user.IssuedBook.issuedBy;
        this.issuedDate=user.IssuedBook.issuedDate;
        this.returnDate=user.IssuedBook.returnDate;
    }
}
module.exports=IssuedBook;
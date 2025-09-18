import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Edit2, Trash2, MapPin, Phone, Mail, Globe, Building } from "lucide-react";
import { User } from "@/types/User";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;
  
  return (
    <Card className="group relative bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 overflow-hidden">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <CardContent className="p-6 relative z-10">
        {/* Avatar and Name Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <img
              src={avatarUrl}
              alt={`${user.name} avatar`}
              className="w-20 h-20 rounded-full bg-secondary p-2 group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&mood=happy`;
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card"></div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-1">{user.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <span className="truncate">{user.email}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span>{user.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            <span className="truncate">{user.website}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="truncate">{user.address.city}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Building className="w-4 h-4 text-primary" />
            <span className="truncate">{user.company.name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`transition-all duration-300 ${
              isLiked 
                ? "text-accent hover:text-accent/80" 
                : "text-muted-foreground hover:text-accent"
            }`}
          >
            <Heart 
              className={`w-4 h-4 mr-2 transition-all duration-300 ${
                isLiked ? "fill-current" : ""
              }`} 
            />
            Like
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(user.id)}
              className="text-muted-foreground hover:text-destructive transition-colors duration-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
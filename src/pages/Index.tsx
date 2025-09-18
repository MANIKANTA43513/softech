import { useState, useEffect } from "react";
import { Users, Sparkles, Loader2 } from "lucide-react";
import UserCard from "@/components/UserCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import EditUserModal from "@/components/EditUserModal";
import { User } from "@/types/User";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const userData = await response.json();
      setUsers(userData);
      toast({
        title: "Success!",
        description: `Loaded ${userData.length} users successfully.`,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    toast({
      title: "User Updated!",
      description: `${updatedUser.name}'s profile has been updated successfully.`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: `${userToDelete?.name || 'User'} has been removed successfully.`,
    });
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header Section */}
      <header className="bg-gradient-card border-b border-border/50 shadow-soft sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  User Profiles
                </h1>
                <p className="text-muted-foreground text-sm">
                  Samplyfi Softech Assignment
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{users.length} Users</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {users.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-secondary/50 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Users Found</h3>
            <p className="text-muted-foreground mb-4">There are no users to display at the moment.</p>
            <button
              onClick={fetchUsers}
              className="inline-flex items-center px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Loader2 className="w-4 h-4 mr-2" />
              Retry Loading
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="animate-float"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: `${6 + (index % 3)}s`
                }}
              >
                <UserCard
                  user={user}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit Modal */}
      <EditUserModal
        user={editingUser}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />

      {/* Footer */}
      <footer className="bg-gradient-card border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p>Built with React, TypeScript & Tailwind CSS</p>
            <p className="mt-1">Samplyfi Softech Frontend Developer Assignment</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

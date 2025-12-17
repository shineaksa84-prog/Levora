import { Fragment, useState, useEffect } from 'react';
import { Dialog, Combobox, Transition } from '@headlessui/react';
import { Search, Command, User, Briefcase, FileText, Settings, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const commands = [
    { id: 1, name: 'Go to Dashboard', href: '/', icon: Command, category: 'Navigation' },
    { id: 2, name: 'Go to Candidates', href: '/candidates', icon: User, category: 'Navigation' },
    { id: 3, name: 'Go to Jobs', href: '/jobs', icon: Briefcase, category: 'Navigation' },
    { id: 4, name: 'Go to AI Hub', href: '/ai-hub', icon: Command, category: 'Navigation' },
    { id: 5, name: 'Create New Candidate', action: 'create_candidate', icon: User, category: 'Actions' },
    { id: 6, name: 'Create New Job', action: 'create_job', icon: Briefcase, category: 'Actions' },
    { id: 7, name: 'Theme Settings', href: '/settings', icon: Settings, category: 'Settings' },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const onKeydown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        window.addEventListener('keydown', onKeydown);
        return () => window.removeEventListener('keydown', onKeydown);
    }, []);

    const filteredCommands = query === ''
        ? commands
        : commands.filter((command) =>
            command.name.toLowerCase().includes(query.toLowerCase())
        );

    const handleSelect = (command) => {
        setIsOpen(false);
        setQuery('');
        if (command.href) {
            navigate(command.href);
        } else {
            console.log('Action triggered:', command.action);
            // Handle actions here
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog onClose={setIsOpen} className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]">
                <Transition.Child
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <Transition.Child
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Combobox onChange={handleSelect} as="div" className="relative mx-auto max-w-xl rounded-xl bg-card shadow-2xl ring-1 ring-black/5 divide-y divide-border overflow-hidden">
                        <div className="flex items-center px-4">
                            <Search className="h-6 w-6 text-muted-foreground" />
                            <Combobox.Input
                                onChange={(event) => setQuery(event.target.value)}
                                className="h-14 w-full border-0 bg-transparent pl-4 pr-4 text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm outline-none"
                                placeholder="Type a command or search..."
                                autoComplete="off"
                            />
                        </div>

                        {filteredCommands.length > 0 && (
                            <Combobox.Options static className="max-h-96 scroll-py-3 overflow-y-auto p-3">
                                {filteredCommands.map((command) => (
                                    <Combobox.Option
                                        key={command.id}
                                        value={command}
                                        className={({ active }) =>
                                            `flex cursor-default select-none items-center rounded-lg px-3 py-3 text-sm transition-colors ${active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                                            }`
                                        }
                                    >
                                        {({ active }) => (
                                            <>
                                                <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${active ? 'bg-background' : 'bg-muted'}`}>
                                                    <command.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                                                </div>
                                                <div className="ml-4 flex-auto">
                                                    <p className={`font-medium ${active ? 'text-accent-foreground' : 'text-foreground'}`}>
                                                        {command.name}
                                                    </p>
                                                    <p className={`text-xs ${active ? 'text-accent-foreground/70' : 'text-muted-foreground'}`}>
                                                        {command.category}
                                                    </p>
                                                </div>
                                                {active && <ArrowRight className="h-4 w-4 text-accent-foreground" />}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}

                        {query !== '' && filteredCommands.length === 0 && (
                            <p className="p-4 text-sm text-muted-foreground text-center">No results found.</p>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}

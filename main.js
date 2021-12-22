const app = new Vue({
    el: "#app",
    data: {
        description: '',
        severity: '',
        assigned: '',
        issues: [],
    },
    methods: {
        addTicket: function() {
            this.saveIssue({
                id: chance.guid(),
                description: this.description,
                severity: this.severity,
                assignedTo: this.assigned,
                status: 'open',
            });
            this.resetForm();
            this.getTickets();
        },
        
        getTickets: function() {
            let issues = localStorage.getItem('issues');
            if (issues && issues !== 'undefined') {
                this.issues = JSON.parse(issues);
            }else{
                localStorage.setItem('issues', JSON.stringify(this.issues));
            }
        },
        saveIssue: function(issue) {
            if (localStorage.getItem('issues') == null) { 
                let issues = [];
                issues.push(issue);    
                localStorage.setItem('issues', JSON.stringify(issues));
            } else { 
                var issues = JSON.parse(localStorage.getItem('issues'));
                issues.push(issue);
                localStorage.setItem('issues', JSON.stringify(issues));
            }
        },
        resetForm(){
            this.description = '';
            this.severity = '';
            this.assigned = '';
        },
        deleteIssue: function(id) {
            const issues = this.issues;
            const remainingIssues = issues.filter(issue => issue.id !== id);
            localStorage.setItem('issues', JSON.stringify(remainingIssues));
            this.getTickets();
        },
        closeIssue: function(id) {
            for(const issue of this.issues) {
                if(issue.id === id) {
                    issue.status = 'closed';
                }
            }
            localStorage.setItem('issues', JSON.stringify(this.issues));
            this.getTickets();
        }
    },
    mounted(){
        this.getTickets();
    }
});